import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import './QrCodeComponent.css';


function QrCodeComponent(props){
return (  
    <div className='popup'>  
     <div className='popup-inner'>  
      <h3 className='popup-title'>Scan the QR Code into Google Authenticator</h3>  
        <QRCode id="qrcode" value={props.qrCode}/>
            <div className='close-popup'>
            <button  onClick={props.handleCloseButton}>Close</button>  
            </div>
     </div>  
    </div>  
    );  
}

const mapStateToProps = state => ({
    qrCode: state.registration.qrCode,
    registerSuccess: state.registration.registerSuccess
})

export default connect(mapStateToProps)(QrCodeComponent);