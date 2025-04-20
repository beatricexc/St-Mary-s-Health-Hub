const Notification = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: isDarkMode ? 'rgba(167, 139, 250, 0.2)' : 'rgba(40, 68, 151, 0.2)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              💧
            </div>
            <div>
              <div style={{
                fontWeight: 600,
                color: isDarkMode ? '#F5F5FF' : '#2D3436'
              }}>
                Time to hydrate!
              </div>
              <div style={{
                fontSize: '12px',
                color: isDarkMode ? 'rgba(245, 245, 255, 0.7)' : 'rgba(45, 52, 54, 0.7)'
              }}>
                You've had {glasses}/8 glasses today
              </div>
            </div>
          </div>
    )
}

export default Notification