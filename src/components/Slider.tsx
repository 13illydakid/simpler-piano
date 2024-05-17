import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';

export function Slider(props: RadixSlider.SliderProps) {
  return (
    <RadixSlider.Root
      {...props}
      className={clsx(
        props.className,
        'relative flex flex-col w-full h-full items-center cursor-pointer',
      )}
    >
      <RadixSlider.Track className="flex relative h-full w-2 items-center flex-col bg-gray-300 overflow-hidden rounded-md">
        <RadixSlider.Range className="flex absolute h-full w-2 bg-black opacity-50" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="flex rounded-full bg-black h-3 w-3 focus:outline-none hover:bg-black hover:opacity-60 hover:scale-125 transition" />
    </RadixSlider.Root>
  );
}
