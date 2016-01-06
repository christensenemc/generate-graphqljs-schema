class StringBuilder {
  constructor(indentLevel){
    this.text = '';
    this.indentLevel = indentLevel;
  }

  line(text){
    this.text += `${'\t'.repeat(this.indentLevel)}${text}\n`;
  }

  block(open,buildBlock,close){
    const blockStringBuilder = new StringBuilder(this.indentLevel + 1);
    buildBlock(blockStringBuilder);
    this.text += `${'\t'.repeat(this.indentLevel)}${open}`;
    this.text += `\n`;
    this.text += blockStringBuilder.text
    this.text += `${'\t'.repeat(this.indentLevel)}${close}`;
    this.text += `\n`;
  }
}

export default function writeText(buildText){
  const stringBuilder = new StringBuilder(0);
  buildText(stringBuilder);
  return stringBuilder.text;
}

