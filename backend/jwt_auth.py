from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime
import base64
from typing import Dict
import logging
import time

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JWTAuthorizationError(Exception):
    """Custom exception for JWT authorization errors"""
    pass

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)
    
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        
        if not credentials:
            raise HTTPException(status_code=403, detail="Invalid authorization token")
        
        if credentials.scheme.lower() != "bearer":
            raise HTTPException(status_code=403, detail="Invalid authentication scheme")
            
        return credentials

class JWTHandler:
    def __init__(self, jwt_secret: str, supabase_url: str):
        try:
            self.jwt_secret = base64.b64decode(jwt_secret).decode('utf-8')
        except Exception as e:
            logger.error(f"Error decoding JWT secret: {e}")
            self.jwt_secret = jwt_secret
            
        self.supabase_url = supabase_url
        self.token_blacklist = set()  # In production, use Redis or similar
        logger.info("JWT Handler initialized successfully")
    
    def verify_jwt(self, token: str) -> Dict:
        """
        Verify and decode a JWT token
        """
        try:
            # Log token receipt (be careful not to log the actual token in production)
            logger.debug("Received token for verification")
            
            # First decode without verification to get the header
            header = jwt.get_unverified_header(token)
            if not header.get('alg') or header['alg'] != 'HS256':
                raise JWTAuthorizationError("Invalid token algorithm")
            
            # Check if token is blacklisted
            if token in self.token_blacklist:
                raise JWTAuthorizationError("Token has been revoked")
            
            # Verify and decode the JWT
            payload = jwt.decode(
                token,
                self.jwt_secret,
                algorithms=["HS256"],
                audience="authenticated",
                options={
                    "verify_signature": True,
                    "verify_aud": True,
                    "verify_iss": True,
                    "verify_exp": True,
                    "verify_iat": True,
                    "require": ["exp", "iat", "aud", "iss"]
                },
                issuer=f"{self.supabase_url}/auth/v1"
            )
            
            # Verify role
            if not payload.get('role') == 'authenticated':
                raise JWTAuthorizationError("Invalid token role")
            
            current_time = int(time.time())
            logger.debug(f"Current UTC timestamp: {current_time}")
            logger.debug(f"Token iat: {payload['iat']}")
            logger.debug(f"Token exp: {payload['exp']}")
            if current_time >= payload['exp']:
                raise JWTAuthorizationError("Token has expired")
            
            if current_time < payload['iat']:
                raise JWTAuthorizationError("Token used before issued")
            logger.debug("Token verified successfully")
            return payload
            
        except jwt.ExpiredSignatureError:
            logger.warning("Token expired")
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError as e:
            logger.warning(f"Invalid token: {str(e)}")
            raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
    
    def blacklist_token(self, token: str):
        """Add token to blacklist"""
        self.token_blacklist.add(token)
        logger.info("Token added to blacklist")
    
    async def debug_token(self, token: str) -> Dict:
        """Debug endpoint to inspect token without verification"""
        try:
            header = jwt.get_unverified_header(token)
            unverified_payload = jwt.decode(token, options={"verify_signature": False})
            return {
                "header": header,
                "payload": unverified_payload
            }
        except Exception as e:
            logger.error(f"Debug token error: {str(e)}")
            return {"error": str(e)}