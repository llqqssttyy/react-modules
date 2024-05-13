type FlexProperties = Pick<
  React.CSSProperties,
  'flexDirection' | 'justifyContent' | 'alignItems' | 'flexWrap' | 'alignContent' | 'gap'
>;

interface FlexProps extends FlexProperties {
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}

/**
 * CSS Flexbox 레이아웃을 쉽게 적용할 수 있도록 도와줍니다.
 *
 * @default alignItems = 'center' - css의 기본값은 'stretch'입니다.
 */
export default function Flex({
  flexDirection = 'row',
  justifyContent = 'flex-start',
  alignItems = 'center',
  flexWrap = 'nowrap',
  alignContent = 'stretch',
  gap = '0',
  style,
  className,
  children,
}: FlexProps) {
  const flexStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    alignContent,
    gap,
    ...style,
  };

  return (
    <div style={flexStyle} className={className}>
      {children}
    </div>
  );
}
