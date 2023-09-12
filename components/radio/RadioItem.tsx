import { motion } from 'framer-motion';
import { RadioOption } from './RadioGroup';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import { RadioDotSvg } from '../svg/RadioDotSvg';
import { GradientBorderSvg } from '../svg/GradientBorderSvg';

export const RadioItem = ({
  option,
  name,
  currentValue,
  onValueChange,
  inputValues,
  onInputChange,
  dotContainerClass,
  dotClass,
  labelClass,
  dotIsSelected,
  showDot = true,
}: {
  option: RadioOption;
  name: string;
  currentValue: string;
  onValueChange: (value: string, key?: string) => void;
  inputValues: Record<string, string>;
  onInputChange: (key: string, value: string) => void;
  dotContainerClass?: string;
  dotClass?: string;
  labelClass?: string;
  showDot?: boolean;
  dotIsSelected?: boolean;
}) => {
  const {
    label,
    value,
    labelClass: innerLabelClass,
    labelStyle: innerLabelStyle,
    isInput,
    placeholder,
    defaultValue,
    key,
    prefix,
    suffix,
    inputClass,
    dotContainerClass: innerDotContainerClass,
    dotClass: innerDotClass,
    beforeOnChange,
    onClick,
    className,
    disabledGradientBorder,
  } = option;
  const realValue = (prefix ?? '') + (isInput ? inputValues[key ?? 'default'] || '' : value) + (suffix ?? '');
  const isSelected = currentValue === realValue;
  const inputValue = inputValues[key ?? 'default'] || '';
  const _dotIsSelected = dotIsSelected ?? isSelected;

  const _onInputChange = useCallback(
    (e: any) => {
      if (beforeOnChange) {
        const isOK = beforeOnChange?.(e.target.value);
        if (!isOK) return;
      }
      onInputChange(key ?? 'default', e.target.value);
    },
    [beforeOnChange, key, onInputChange],
  );

  // When the value in an incoming option changes, the control changes together with the internal
  useEffect(() => {
    if (!value) return;
    if (beforeOnChange) {
      const isOK = beforeOnChange?.(value);
      if (!isOK) return;
    }
    onInputChange(key ?? 'default', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <label className={twMerge('group inline-flex cursor-pointer items-center gap-2', className)}>
      <input
        type="radio"
        className="hidden"
        name={name}
        value={realValue}
        checked={isSelected}
        onChange={() => onValueChange(realValue, key)}
      />
      {showDot && (
        <div
          className={twMerge(
            classNames('relative flex h-5 w-5 items-center justify-center rounded-full bg-transparent', {
              'border-2 border-white/30': !isSelected,
              'group-hover:border-white': !_dotIsSelected,
            }),
            dotContainerClass,
            innerDotContainerClass,
          )}
        >
          {_dotIsSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={twMerge('absolute inset-0 transform', dotClass, innerDotClass)}
            >
              <RadioDotSvg />
            </motion.div>
          )}
        </div>
      )}
      <span
        onClick={onClick}
        className={twMerge(
          classNames(
            'relative z-0 flex-grow rounded-lg border px-3 py-2.5',
            isSelected ? 'border-transparent' : 'border-white/30 group-hover:border-white',
            { 'border-none bg-white/20 group-hover:border group-hover:border-white/20': isInput },
          ),
          labelClass,
          innerLabelClass,
        )}
        style={innerLabelStyle}
      >
        {isSelected && !disabledGradientBorder && (
          <GradientBorderSvg type="radioItem" className="absolute inset-0 h-full w-full" />
        )}
        <span className="sticky z-10">
          {prefix}
          {label}
          {isInput && (
            <input
              className={twMerge('w-full bg-transparent placeholder:text-white/50', inputClass)}
              placeholder={placeholder ?? 'Please input'}
              defaultValue={defaultValue}
              value={inputValue}
              onChange={_onInputChange}
            />
          )}
          {suffix}
        </span>
      </span>
    </label>
  );
};
