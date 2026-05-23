import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Settings,
  Trash2,
  Undo2,
  Redo2,
  Download,
  Eye,
  EyeOff,
  Zap,
  HelpCircle
} from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const COLORS = [
  '#00ffff', // Neon Cyan
  '#ff00ff', // Neon Pink
  '#ffff00', // Neon Yellow
  '#00ff00', // Neon Green
  '#ff0000', // Neon Red
  '#ffffff', // Pure White
];

const ControlPanel = ({
  settings,
  onSettingsChange,
  onClear,
  onUndo,
  onRedo,
  onSave,
  onToggleCamera,
  cameraVisible,
  gestureVisible,
  onToggleGestures,
  onHelp
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{
      position: 'fixed',
      right: '24px',
      top: '24px',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'flex-end',
    }}>
      <motion.button
        className="glass-meta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Settings size={22} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glass-meta"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            style={{
              borderRadius: '24px',
              padding: '24px',
              width: '280px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginTop: '12px'
            }}
          >
            {/* Color Palette */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <Palette size={16} /> Paleta de Cores
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                {COLORS.map((c) => (
                  <motion.div
                    key={c}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSettingsChange({ color: c, isEraser: false })}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: c,
                      cursor: 'pointer',
                      border: settings.color === c ? '2px solid #fff' : 'none',
                      boxShadow: settings.color === c ? `0 0 15px ${c}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  Espessura do Pincel: {settings.lineWidth}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={settings.lineWidth}
                  onChange={(e) => onSettingsChange({ lineWidth: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: settings.color }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  Intensidade do Brilho: {settings.glowIntensity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={settings.glowIntensity}
                  onChange={(e) => onSettingsChange({ glowIntensity: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: settings.color }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <ActionButton icon={<Undo2 size={18} />} label="Desfazer" onClick={onUndo} />
              <ActionButton icon={<Redo2 size={18} />} label="Refazer" onClick={onRedo} />
              <ActionButton icon={<Trash2 size={18} />} label="Limpar" onClick={onClear} />
              <ActionButton icon={<Download size={18} />} label="Salvar" onClick={onSave} />
              <ActionButton
                icon={cameraVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                label={cameraVisible ? "Ocultar Cam" : "Mostrar Cam"}
                onClick={onToggleCamera}
              />
              <ActionButton
                icon={<Zap size={18} />}
                label={gestureVisible ? "Gestos On" : "Gestos Off"}
                onClick={onToggleGestures}
                active={gestureVisible}
              />
              <ActionButton
                icon={<HelpCircle size={18} />}
                label="Ajuda"
                onClick={onHelp}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Branding */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '12px',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 110,
      }}>
        <a
          href="https://www.instagram.com/jacque_tech/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            transition: 'color 0.2s, transform 0.2s',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E1306C'; e.currentTarget.style.transform = 'scale(1.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <InstagramIcon size={20} />
        </a>
        <span style={{
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.35)',
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}>
          @jacque_tech
        </span>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick, active = false }) => (
  <motion.button
    className="glass-meta"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      borderRadius: '12px',
      padding: '10px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
      fontSize: '10px',
      transition: 'all 0.2s',
      boxShadow: active ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
      border: active ? '1px solid rgba(255, 255, 255, 0.4)' : undefined
    }}
  >
    {icon}
    {label}
  </motion.button>
);

export default ControlPanel;
