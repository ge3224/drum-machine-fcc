import { useEffect, useState } from "react";

type DrumPad = {
  padID: string;
  clip: string;
  clipID: string;
};

const DRUM_PAD_DATA: Array<DrumPad> = [
  {
    padID: "heater-1",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    clipID: "Q",
  },
  {
    padID: "heater-2",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    clipID: "W",
  },
  {
    padID: "heater-3",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    clipID: "E",
  },
  {
    padID: "heater-4",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    clipID: "A",
  },
  {
    padID: "heater-6",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    clipID: "S",
  },
  {
    padID: "open-hh",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    clipID: "D",
  },
  {
    padID: "kick-n-hh",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    clipID: "Z",
  },
  {
    padID: "kick",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    clipID: "X",
  },
  {
    padID: "closed-hh",
    clip: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    clipID: "C",
  },
];

// const MISSING_AUDIO = "No audio clip was found inside of this <div> element: id '%s'.";

export default function App() {
  const [sound, setSound] = useState<string>("***");

  // User Story #5: When I click on a .drum-pad element, the audio clip contained in its child
  // audio element should be triggered.
  const playAudio = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const id = e.currentTarget.id;
    const clip = e.currentTarget.childNodes[0] as HTMLAudioElement;
    if (!clip) {
      console.error(
        "No audio element was found inside of this parent element: id '%s'.",
        e.currentTarget.id,
      );
      return;
    }
    clip.play();
    if (id) {
      setSound(e.currentTarget.id);
    }
  };

  // User Story #6: When I press the trigger key associated with each .drum-pad, the audio clip
  // contained in its child audio element should be triggered (e.g. pressing the Q key should
  // trigger the drum pad which contains the string Q, pressing the W key should trigger the drum
  // pad which contains the string W, etc.).
  const handleKeyDown = (e: KeyboardEvent) => {
    DRUM_PAD_DATA.map((pad) => {
      if (pad.clipID === e.key.toUpperCase()) {
        const clip = document.getElementById(pad.clipID) as HTMLAudioElement;
        if (!clip) {
          console.error(
            "No audio element was found with an id of '%s'",
            pad.clipID,
          );
        }
        clip.play();
        setSound(pad.padID);
      }
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-slate-900 px-8 pb-12 pt-8">
      {/* 
        User Story #1: I should be able to see an outer container with a corresponding 
        id="drum-machine" that contains all other elements. 
      */}
      <article
        className="flex w-fit flex-col items-center rounded border border-slate-600 bg-slate-800 p-8"
        id="drum-machine"
      >
        {/* User Story #2: Within #drum-machine I can see an element with a corresponding id="display". */}
        <div className="mb-6 w-full rounded bg-slate-400 px-5 py-2 text-center text-slate-800 shadow-inner" id="display">
          {sound}
        </div>
        <div className="mb-6 grid w-fit grid-cols-3 gap-4">
          {/*
            User Story #3: Within #drum-machine I can see 9 clickable drum pad elements, each with 
            a class name of drum-pad, a unique id that describes the audio clip the drum pad will 
            be set up to trigger, and an inner text that corresponds to one of the following keys 
            on the keyboard: Q, W, E, A, S, D, Z, X, C. The drum pads MUST be in this order.
           */}
          {DRUM_PAD_DATA.map((pad: DrumPad) => {
            {
              /* 
                User Story #4: Within each .drum-pad, there should be an HTML5 audio element which has 
                a src attribute pointing to an audio clip, a class name of clip, and an id corresponding
                to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).
              */
            }
            return (
              <button
                key={pad.padID}
                className="drum-pad flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-cyan-200 to-teal-300 text-2xl font-semibold text-teal-800 shadow transition-colors duration-200 ease-in-out hover:from-cyan-400 hover:to-teal-600"
                id={pad.padID}
                onClick={playAudio}
              >
                <audio className="clip" id={pad.clipID} src={pad.clip}></audio>
                {pad.clipID}
              </button>
            );
          })}
        </div>
      </article>
      <div className="mt-6 w-full text-center text-sm text-slate-100 underline visited:text-slate-100">
        <a href="https://github.com/ge3224/drum-machine-fcc" target="_blank">
          Source Code on Github
        </a>
      </div>
    </main>
  );
}
