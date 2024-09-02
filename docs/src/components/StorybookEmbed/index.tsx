import * as React from 'react';

const baseStorybookUrl = 'https://aquamarine-choux-75c766.netlify.app';

function storyUrl(group: string, name: string) {
  const url = new URL(baseStorybookUrl + '/iframe.html');
  url.searchParams.append('args', '');
  url.searchParams.append('id', `${group}-${name}`);
  url.searchParams.append('viewMode', 'story');
  return url.href;
}

interface Props {
  group?: string;
  name: string;
}

export function StorybookEmbed({group = 'core', name}: Props) {
  // TODO: whitebackground as dark mode breaks
  // TODO border
  const src = React.useMemo(() => storyUrl(group, name), [group, name]);
  return <iframe width='100%' height='300px' src={src}></iframe>;
}
