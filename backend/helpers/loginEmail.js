const loginEmail = (user) => {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px; font-family:Arial, sans-serif;">
  <tr>
    <td align="center">
      
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
        
        <tr>
          <td style="background:#2c3e50; color:#ffffff; text-align:center; padding:15px;">
            <h2 style="margin:0;">Avya Estate CRM</h2>
          </td>
        </tr>

        <tr>
          <td style="padding:20px; color:#333;">
            
            <p style="font-size:16px;">Hi <strong>${user.name}</strong>,</p>

            <p>We noticed a login to your <strong>Avya Estate CRM</strong> account.</p>

            <table width="100%" cellpadding="8" cellspacing="0" style="background:#f9f9f9; border:1px solid #ddd; margin:15px 0;">
              <tr>
                <td style="font-weight:bold;">Name</td>
                <td>${user.name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Mobile</td>
                <td>${user.mobile}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Time</td>
                <td>${new Date().toLocaleString()}</td>
              </tr>
            </table>

            <p>If this was you, no action is needed.</p>

            <p style="color:red; font-weight:bold;">
              If you did NOT log in, please reset your password immediately.
            </p>

            <br/>

            <p>Regards,<br/><strong>Avya Estate CRM Team</strong></p>

          </td>
        </tr>

        <tr>
          <td style="background:#ecf0f1; text-align:center; padding:10px; font-size:12px; color:#555;">
            © ${new Date().getFullYear()} Avya Estate CRM. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`;
};

module.exports = loginEmail;