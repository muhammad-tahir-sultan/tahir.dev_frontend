import { useCallback } from "react";
import Particles from "react-particles";
import { useSelector } from "react-redux";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const ParticleComponent = () => {
  const particlesInit = useCallback(async engine => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // Container loaded callback
  }, []);

  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60, // Lower for better performance
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 100,
                duration: 0.7,
              },
            },
          },
          particles: {
            color: {
              value: darkMode ? "#4b63c2" : "#004e60",
            },
            links: {
              color: darkMode ? "#4b63c2" : "#004e92",
              distance: 120,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 4, // Slower for better performance
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000, // Larger area = fewer particles
              },
              value: 60, // Reduced number of particles
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
          pauseOnOutsideViewport: true, // Pause when not visible for performance
        }}
      />
    </div>
  );
};

export default ParticleComponent