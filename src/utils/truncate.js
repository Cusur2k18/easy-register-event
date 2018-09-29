export function truncate(t, cc = 30, placeholderText = '') {

  if (t.length > cc) {
    return t.substring(0, 30).concat('...')
  }
  return t
}