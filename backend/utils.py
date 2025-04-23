from datetime import datetime, date

def format_date(date_obj: date) -> str:
    """Format a date object as ISO string"""
    return date_obj.isoformat()

def parse_date(date_str: str) -> date:
    """Parse an ISO date string into a date object"""
    return datetime.fromisoformat(date_str).date()