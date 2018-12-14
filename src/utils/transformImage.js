export default function(url, transformations = ['q_auto', 'f_auto']) {

  if (!url.includes('q_auto') && !url.includes('q_auto')) {
    transformations.push('q_auto', 'f_auto')
  }

  return url.split('upload').join(`upload/${transformations.join(',')}`)
}
