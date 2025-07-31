import { Resend } from 'resend';

// Welkomst email versturen
export const sendWelcomeEmail = async (resend, userData) => {
  if (!resend) {
    console.log('📧 Email service not available, skipping welcome email');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Staalplatform <onboarding@resend.dev>',
      to: [userData.email],
      subject: 'Welkom bij Staalplatform!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Staalplatform</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9fafb;">
            <h2 style="color: #1f2937;">Welkom ${userData.first_name}!</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Bedankt voor je registratie bij Staalplatform. Je account is succesvol aangemaakt.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Je account gegevens:</h3>
              <p><strong>Bedrijf:</strong> ${userData.company_name}</p>
              <p><strong>Type:</strong> ${userData.user_type === 'buyer' ? 'Afnemer' : 'Leverancier'}</p>
              <p><strong>Email:</strong> ${userData.email}</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Je kunt nu inloggen en gebruik maken van alle functies van het platform.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="http://localhost:5173/login" 
                 style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Inloggen
              </a>
            </div>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Dit is een automatisch gegenereerde email. Reageer niet op dit bericht.</p>
            <p>&copy; 2024 Staalplatform. Alle rechten voorbehouden.</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('📧 Email error:', error);
      return false;
    }

    console.log('📧 Welcome email sent successfully to:', userData.email);
    return true;
  } catch (error) {
    console.error('📧 Email sending failed:', error);
    return false;
  }
};

// Email verificatie versturen (voor later gebruik)
export const sendVerificationEmail = async (resend, userData, verificationToken) => {
  if (!resend) {
    console.log('📧 Email service not available, skipping verification email');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Staalplatform <onboarding@resend.dev>',
      to: [userData.email],
      subject: 'Verificeer je emailadres - Staalplatform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Staalplatform</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9fafb;">
            <h2 style="color: #1f2937;">Verificeer je emailadres</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Hallo ${userData.first_name},<br>
              Klik op de onderstaande knop om je emailadres te verifiëren:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173/verify/${verificationToken}" 
                 style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Email Verifiëren
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              Als de knop niet werkt, kopieer dan deze link naar je browser:<br>
              <a href="http://localhost:5173/verify/${verificationToken}" style="color: #1e40af;">
                http://localhost:5173/verify/${verificationToken}
              </a>
            </p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Dit is een automatisch gegenereerde email. Reageer niet op dit bericht.</p>
            <p>&copy; 2024 Staalplatform. Alle rechten voorbehouden.</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('📧 Verification email error:', error);
      return false;
    }

    console.log('📧 Verification email sent successfully to:', userData.email);
    return true;
  } catch (error) {
    console.error('📧 Verification email sending failed:', error);
    return false;
  }
}; 