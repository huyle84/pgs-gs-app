import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ Email và mật khẩu.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      let msg = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      if (err.code === 'auth/email-already-in-use') msg = 'Email này đã được sử dụng.';
      else if (err.code === 'auth/invalid-email') msg = 'Email không hợp lệ.';
      else if (err.code === 'auth/weak-password') msg = 'Mật khẩu quá yếu (cần ít nhất 6 ký tự).';
      else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') 
        msg = 'Email hoặc mật khẩu không chính xác.';
      else if (err.code === 'auth/operation-not-allowed') 
        msg = 'Bạn chưa bật tính năng Đăng nhập Email/Password trên Firebase Console.';
      else msg = `Lỗi hệ thống (${err.code}): ${err.message}`;
      
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {isRegistering ? 'Đăng ký tài khoản' : 'Đăng nhập'}
        </h2>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="Nhập địa chỉ email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Đang xử lý...' : (isRegistering ? 'Tạo tài khoản' : 'Đăng nhập')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            className="btn btn-outline" 
            style={{ border: 'none', background: 'transparent', color: 'var(--primary)', padding: 0 }}
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
          >
            {isRegistering ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký mới'}
          </button>
        </div>
      </div>
    </div>
  );
};
