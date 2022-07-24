const validateVideo = (src: string) => {
  const videoExts = new Array('mp4','avi','fiv','mov','wmv');
  const pos = src.lastIndexOf('.');
	if (pos === -1) return false;

	const ext = src.slice(pos + 1);
  if (videoExts.indexOf(ext) === -1) return false;
	return true;
}

export default validateVideo