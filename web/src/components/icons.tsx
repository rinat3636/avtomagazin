export function IconSearch(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M10 2a8 8 0 1 1-4.9 14.3l-3.4 3.4 1.4 1.4 3.4-3.4A8 8 0 0 1 10 2Zm0 2a6 6 0 1 0 6 6 6 6 0 0 0-6-6Z"
      />
    </svg>
  )
}

export function IconCart(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59L5.25 14A2 2 0 0 0 7 17h14v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.46 4H5.21l-.94-2H1z"
      />
    </svg>
  )
}

export function IconCar(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
      />
    </svg>
  )
}

export function IconMenu(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" />
    </svg>
  )
}

export function IconClose(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M6.4 4.6 12 10.2l5.6-5.6 1.8 1.8-5.6 5.6 5.6 5.6-1.8 1.8-5.6-5.6-5.6 5.6-1.8-1.8 5.6-5.6-5.6-5.6 1.8-1.8Z"
      />
    </svg>
  )
}

export function IconHeart(props: { className?: string; filled?: boolean }) {
  const { filled, className } = props
  return (
    <svg className={className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      {filled ? (
        <path
          fill="currentColor"
          d="M12 21s-7.2-4.35-9.6-8.25C.45 9.9 1.5 6 5.25 6c1.95 0 3.45 1.2 4.2 2.1.75-.9 2.25-2.1 4.2-2.1 3.75 0 4.8 3.9 2.85 6.75C14.1 16.65 12 21 12 21Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M12 21s-7.2-4.35-9.6-8.25C.45 9.9 1.5 6 5.25 6c1.95 0 3.45 1.2 4.2 2.1.75-.9 2.25-2.1 4.2-2.1 3.75 0 4.8 3.9 2.85 6.75C14.1 16.65 12 21 12 21Zm-6.75-12c-2.1 0-2.55 2.1-1.2 3.9C5.7 15.9 12 20.1 12 20.1s6.3-4.2 7.95-7.2c1.35-1.8.9-3.9-1.2-3.9-1.65 0-2.85.9-3.75 1.95L12 12.45l-1.05-1.35c-.9-1.05-2.1-1.95-3.75-1.95Z"
        />
      )}
    </svg>
  )
}

export function IconChevronRight(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon icon--sm'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="m9 6 6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6L9 6Z" />
    </svg>
  )
}

export function IconWrench(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
  )
}

export function IconBrakeDisk(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0 2a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  )
}

export function IconShock(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M11 2h2v3h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2v2.27A3 3 0 0 1 15 13v3a3 3 0 0 1-2 2.83V22h-2v-3.17A3 3 0 0 1 9 16v-3a3 3 0 0 1 2-2.73V9H9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2V2zm1 10a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1z" />
    </svg>
  )
}

export function IconFunnel(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M4.25 5.61C6.27 8.2 10 13 10 13v7c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-7s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" />
    </svg>
  )
}

export function IconBolt(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M7 2v11h3v9l7-12h-4l4-8z" />
    </svg>
  )
}

export function IconTruck(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  )
}

export function IconShield(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  )
}

export function IconRefresh(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.87 5.87 0 0 1 6 12c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
    </svg>
  )
}

export function IconSupport(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12v3c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2H4.07C4.56 7.19 7.93 4 12 4s7.44 3.19 7.93 8H19c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h1v1c0 1.1-.9 2-2 2h-3v-1h-2v3h5c2.21 0 4-1.79 4-4v-8c0-5.52-4.48-10-10-10z" />
    </svg>
  )
}
