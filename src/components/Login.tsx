import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    // Logic giả lập: lưu toàn bộ danh sách user trong localStorage với key 'gs_pgs_users'
    const usersStr = localStorage.getItem('gs_pgs_users');
    const users: Record<string, string> = usersStr ? JSON.parse(usersStr) : {};

    if (isRegistering) {
      if (users[username]) {
        setError('Tài khoản này đã tồn tại. Vui lòng chọn tên khác hoặc đăng nhập.');
        return;
      }
      // Tạo tài khoản mới
      users[username] = password;
      localStorage.setItem('gs_pgs_users', JSON.stringify(users));
      login(username);
    } else {
      if (!users[username]) {
        setError('Tài khoản không tồn tại. Vui lòng đăng ký mới.');
        return;
      }
      if (users[username] !== password) {
        setError('Mật khẩu không chính xác.');
        return;
      }
      // Đăng nhập thành công
      login(username);
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
            <label className="form-label">Tên đăng nhập / Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="Nhập tên tài khoản"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Nhập mật khẩu"
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isRegistering ? 'Tạo tài khoản' : 'Đăng nhập'}
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
