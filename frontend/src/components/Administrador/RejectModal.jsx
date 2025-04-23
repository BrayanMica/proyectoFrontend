import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RejectModal = ({ show, onHide, rejectReason, setRejectReason, confirmReject }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Motivo de Rechazo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group>
        <Form.Label>Por favor, indique el motivo del rechazo:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          required
        />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancelar
      </Button>
      <Button variant="danger" onClick={confirmReject} disabled={!rejectReason.trim()}>
        Confirmar Rechazo
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RejectModal;