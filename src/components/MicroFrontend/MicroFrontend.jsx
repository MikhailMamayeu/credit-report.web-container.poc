import { useEffect } from 'react';

const MicroFrontend = ({ config }) => {
  useEffect(() => {
    if (document.getElementById(`${config.name}-script`)) {
      console.log(`${config.script} from ${config.host} already loaded`);
    } else {
      fetch(`${config.host}/manifest.json`)
        .then(res => res.json())
        .then(data => {
          const scriptElement = document.createElement('script');

          scriptElement.id = `${config.name}-script`;
          scriptElement.src = `${config.host}${data[config.script]}`;
          scriptElement.onload = () => {
            console.log(`Loaded ${config.script} from ${config.host}`);

            window[config.render](
              document.getElementById(`${config.name}-container`)
            );
          };

          document.body.appendChild(scriptElement);
        });
    }
  }, [config]);

  return null;
};

export default MicroFrontend;
