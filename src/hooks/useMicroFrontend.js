import { useEffect } from 'react';

const useMicroFrontend = (microFrontend, history) => {
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
        } else if (manifest[microFrontend.styles]) {
          const linkTag = document.createElement('link');

          linkTag.id = `${microFrontend.name}-styles`;
          linkTag.href = manifest[microFrontend.styles];
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
          scriptTag.src = manifest[microFrontend.script];
          scriptTag.onload = () => {
            console.log(
              `Loaded ${microFrontend.script} from ${microFrontend.host}`
            );

            window[microFrontend.render](
              document.getElementById(`${microFrontend.name}-container`),
              history
            );
          };

          document.body.appendChild(scriptTag);
        }
      }
    };

    loadResources();
  }, [microFrontend, history]);
};

export default useMicroFrontend;
