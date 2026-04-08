import styles from './PasswordStrength.module.css';

const checks = [
  { label: 'At least 8 characters',      test: p => p.length >= 8 },
  { label: 'One uppercase letter',        test: p => /[A-Z]/.test(p) },
  { label: 'One number',                  test: p => /[0-9]/.test(p) },
  { label: 'One special character (!@#$)', test: p => /[^A-Za-z0-9]/.test(p) },
];

export function getPasswordStrength(password) {
  const passed = checks.filter(c => c.test(password)).length;
  if (passed === 0) return { score: 0, label: '',          color: '' };
  if (passed === 1) return { score: 1, label: 'Weak',      color: '#CC0000' };
  if (passed === 2) return { score: 2, label: 'Fair',      color: '#FF8C00' };
  if (passed === 3) return { score: 3, label: 'Good',      color: '#7EBD3E' };
  if (passed === 4) return { score: 4, label: 'Strong',    color: '#3A6B0E' };
}

export function isPasswordValid(password) {
  return checks.every(c => c.test(password));
}

function PasswordStrength({ password }) {
  if (!password) return null;
  const { score, label, color } = getPasswordStrength(password);

  return (
    <div className={styles.wrap}>
      <div className={styles.bars}>
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={styles.bar}
            style={{ background: i <= score ? color : '#E0E0E0' }}
          />
        ))}
      </div>
      {label && <span className={styles.label} style={{ color }}>{label}</span>}
      <div className={styles.checks}>
        {checks.map((check, i) => (
          <div key={i} className={`${styles.check} ${check.test(password) ? styles.checkPassed : ''}`}>
            <span>{check.test(password) ? '✓' : '○'}</span>
            <span>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordStrength;
