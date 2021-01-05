import { useEffect } from 'react';

/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key, action) {
    // TODO: implement
    // TODO: define event listener

    //define the event listener
    useEffect(() => {
        function onKeyup(e) {
          if (e.key === key) action()
        }
        //register event listener
        window.addEventListener('keyup', onKeyup);
        //unregister event listener (al final de la vida del componente)
        return () => window.removeEventListener('keyup', onKeyup);
    }, []);

    // TODO: register event listener

    // TODO: unregister event listener

    // TODO: link to component lifecycle
  }