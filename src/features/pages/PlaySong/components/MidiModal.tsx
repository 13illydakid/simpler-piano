import { Modal, Sizer } from '@/components';
import { disableMidiDevice, enableMidiDevice, isMidiDeviceEnabled } from '@/features/midi';
import { useMidiInputs } from '@/hooks';
import { RefreshCw } from '@/icons';
import clsx from 'clsx';
import { useState } from 'react';

interface MidiModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MidiModal(props: MidiModalProps) {
  const { isOpen, onClose } = props;
  const { inputs, refresh } = useMidiInputs();
  const [animating, setAnimating] = useState(false);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="relative text-base p-8 flex flex-col w-[min(100vw,500px)]">
        <h1 className="text-3xl font-bold">Connect Your Piano</h1>
        <Sizer height={32} />
        <div className="flex gap-3">
          <h1 className="text-lg font-medium">Available devices</h1>
          <button
            style={{ animationIterationCount: 0.5 }}
            className={clsx('hover:text-black', animating && 'animate-spin')}
            onClick={() => {
              refresh()
              setAnimating(true)
            }}
            onAnimationEnd={() => {
              setAnimating(false)
            }}
          >
            <RefreshCw />
          </button>
        </div>
        <Sizer height={8} />
        <div className="flex flex-col gap-1 min-h-[200px] bg-gray-100 rounded-md">
          {!inputs?.size && (
            <span className="p-5 text-gray-900">
              No devices found. Please connect a MIDI device and hit refresh.
            </span>
          )}
          {inputs &&
            Array.from(inputs.values()).map((device) => {
              const enabled = isMidiDeviceEnabled(device)
              return (
                <div
                  className="odd:bg-gray-200 flex justify-between items-center h-12 p-4"
                  key={device.id}
                >
                  {device.name}
                  <DeviceBtn
                    enabled={enabled}
                    onClick={async () => {
                      if (enabled) {
                        disableMidiDevice(device)
                      } else {
                        enableMidiDevice(device)
                      }
                      refresh()
                    }}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </Modal>
  );
};

function DeviceBtn({
  enabled,
  ...rest
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  enabled: boolean
}) {
  return (
    <button
      className={clsx(
        'px-2 py-1 border border-black rounded-xl transition hover:bg-orange-400',
        enabled && 'bg-black text-white',
      )}
      {...rest}
    >
      {enabled ? 'Disable' : 'Enable'}
    </button>
  );
};
