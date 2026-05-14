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
        d="M7 4V2h10v2h4v2H3V4h4Zm-2 4h14l-2 12H7L5 8Zm4 2v8h2v-8H9Zm4 0v8h2v-8h-2Z"
      />
    </svg>
  )
}

export function IconCar(props: { className?: string }) {
  return (
    <svg className={props.className ?? 'icon'} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M5 11l1.5-4h11L19 11v7H5v-7Zm2 1v5h10v-5H7Zm1.2-2h7.6l-.6-2H8.8l-.6 2ZM7 15h2v1H7v-1Zm8 0h2v1h-2v-1Z"
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
