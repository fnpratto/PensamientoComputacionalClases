import { QRCodeSVG } from 'qrcode.react';

/**
 * Cierre de la clase: el QR del formulario de feedback (el mismo de la última
 * diapositiva) y el link, para quien esté en la compu y no pueda escanear.
 * El QR se genera en el navegador a partir de `url`, así no hay una imagen
 * suelta que se desincronice si el formulario cambia.
 * @param {{feedback: NonNullable<import('../courses/types.js').Course['feedback']>}} props
 */
export default function Feedback({ feedback }) {
  return (
    <div className="feedback">
      <a
        className="feedback-qr"
        href={feedback.url}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir el formulario de feedback"
      >
        {/* Fondo blanco fijo: un QR sobre fondo oscuro no lo lee ninguna cámara. */}
        <QRCodeSVG value={feedback.url} size={192} bgColor="#ffffff" fgColor="#0b0f14" level="M" />
      </a>
      <div className="feedback-body">
        {feedback.note && <p className="feedback-note">{feedback.note}</p>}
        <a className="feedback-link" href={feedback.url} target="_blank" rel="noreferrer">
          Abrir el formulario →
        </a>
      </div>
    </div>
  );
}
