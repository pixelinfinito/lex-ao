import re
import yaml
import sys
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM
from pathlib import Path

def split_text(text, max_length):
    sections = text.split('de', 1) 
    lines = []

    if len(sections) > 1:
        sections[1] = 'de' + sections[1]

    for section in sections:
        words = section.split(' ')
        current_line = []
        current_len = 0
        for word in words:
            word_len = len(word)
            if current_len + word_len <= max_length:
                current_line.append(word)
                current_len += word_len + 1  # account for spaces
            else:
                lines.append(' '.join(current_line))
                current_line = [word]
                current_len = word_len
        if current_line:
            lines.append(' '.join(current_line))
    return lines


title_pattern = re.compile(r'^title: (.*)$', re.MULTILINE)
line_pattern = re.compile(r'^# ([^#.!?]*)', re.MULTILINE)

def parse_mdx(file_path):
    content = file_path.read_text()
    match = title_pattern.search(content)
    return match.group(1) if match else ''

def parse_content_md(file_path):
    content = file_path.read_text()
    line = line_pattern.search(content)
    if line is None:
        return ['']*4
    lines = split_text(line.group(1), 27)
    return lines + [''] * (4 - len(lines))

def main(target_dir):
    target_path = Path(target_dir)
    template = Path('template.svg').read_text()

    for path in target_path.rglob('*'):
        if path.is_dir() and {'index.mdx', '_content.md'}.issubset(set(file.name for file in path.iterdir())):
            law_ref = split_text(parse_mdx(path / 'index.mdx'), 30)
            lines = parse_content_md(path / '_content.md')

            svg_str = template
            for i, ref_line in enumerate(law_ref):
                svg_str = svg_str.replace(f'LAW_REF_{i+1}', ref_line)
            for i, line in enumerate(lines):
                svg_str = svg_str.replace(f'LINE_{i+1}', line)

            (path / 'social-image.svg').write_text(svg_str)

            drawing = svg2rlg(str(path / 'social-image.svg'))
            renderPM.drawToFile(drawing, str(path / 'social-image.png'), fmt='PNG')
            (path / 'social-image.svg').unlink()

if __name__ == "__main__":
    main(sys.argv[1])
