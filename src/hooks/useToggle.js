import {useState} from 'react'

function useToggle() {
    const [textConfigIsShown, setTextConfigIsShown] = useState(false);
    const showTextConfig = (e) => {
      e.preventDefault();
      setTextConfigIsShown(true);
    };
    const hideTextConfig = (e) => {
      e.preventDefault();
      setTextConfigIsShown(false);
    };
    const [logoConfigIsShown, setLogoConfigIsShown] = useState(false);
    const showLogoConfig = (e) => {
      e.preventDefault();
      setLogoConfigIsShown(true);
    };
    const hideLogoConfig = (e) => {
      e.preventDefault();
      setLogoConfigIsShown(false);
    };

    return {showLogoConfig,hideLogoConfig,showTextConfig,hideTextConfig,textConfigIsShown,logoConfigIsShown}
}


export default useToggle