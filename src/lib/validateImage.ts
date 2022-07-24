const validateImage = (src: string) => {
  const img_exts = new Array('jpg', 'jpeg', 'png', 'svg');
  const pos = src.lastIndexOf('.');
	if (pos === -1) return false;

	const ext = src.slice(pos + 1);
  if (img_exts.indexOf(ext) === -1) return false;
	return true;
}

export default validateImage