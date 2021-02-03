import { useEffect } from 'react';

const useMicroFrontend = microFrontend => {
  useEffect(() => {
    const loadResources = async () => {
      if (
        document.getElementById(`${microFrontend.name}-styles`) &&
        document.getElementById(`${microFrontend.name}-script`)
      ) {
        console.log(
          `${microFrontend.styles} and ${microFrontend.script} from ${microFrontend.host} have already been loaded`
        );
      } else {
        const manifest = await fetch(
          `${microFrontend.host}/manifest.json`
        ).then(res => res.json());
        if (document.getElementById(`${microFrontend.name}-styles`)) {
          console.log(
            `${microFrontend.styles} from ${microFrontend.host} has already been loaded`
          );
        } else {
          const linkTag = document.createElement('link');

          linkTag.href = `${microFrontend.host}${
            manifest[microFrontend.styles]
          }`;
          linkTag.rel = 'stylesheet';

          document.head.appendChild(linkTag);
        }

        if (document.getElementById(`${microFrontend.name}-script`)) {
          console.log(
            `${microFrontend.script} from ${microFrontend.host} has already been loaded`
          );
        } else {
          const scriptTag = document.createElement('script');

          scriptTag.id = `${microFrontend.name}-script`;
          scriptTag.src = `${microFrontend.host}${
            manifest[microFrontend.script]
          }`;
          scriptTag.onload = () => {
            console.log(
              `Loaded ${microFrontend.script} from ${microFrontend.host}`
            );

            window[microFrontend.render](
              document.getElementById(`${microFrontend.name}-container`)
            );
          };

          document.body.appendChild(scriptTag);
        }
      }
    };

    loadResources();
  }, [microFrontend]);
};

export default useMicroFrontend;
