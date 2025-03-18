import useOutsideClick from "@/hooks/useOutsideClick";
import { useState, useRef, useLayoutEffect, useTransition } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";

export default function DeleteBtn({ iconSize = 24, onDelete }) {
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClick = () => {
    startTransition(() => {
      if (hasConfirmed) {
        onDelete && onDelete();
        setHasConfirmed(false);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else {
        setHasConfirmed(true);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setHasConfirmed(false);
          timerRef.current = null;
        }, 2000);
      }
    });
  };

  useLayoutEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const unconfirm = () => {
    setHasConfirmed(false);
  };

  useOutsideClick(buttonRef, unconfirm);

  return (
    <button ref={buttonRef} type="button" onClick={handleClick} disabled={isPending}>
      {hasConfirmed ? (
        <IoCheckmark size={iconSize} color="red" />
      ) : (
        <FaRegTrashCan size={iconSize} color="red" />
      )}
    </button>
  );
}
