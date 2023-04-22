import React from 'react';
import Tag from './Tag';
import { NamedTagInMap, getTagFromMap, tagInMap } from './tagUtils';
import { Avatar } from '@mui/material';
import { getFormattedName, getInitials, stringToColor } from '../../utils/utils';

const defaultSize = '20px';
const defaultFontSize = '12px';

const makeAuthorAvatar = (name: string, width: string = defaultSize, height: string = defaultSize, fontSize: string = defaultFontSize) => {
    return (
        <Avatar
        alt={name}
        src={`./people/${name.replace(' ', '')}.jpeg`}
        sx={{ width: width, height: height, fontSize: fontSize, backgroundColor: stringToColor(name) }}
      >
        {getInitials(name)}
      </Avatar>
    )
};

const makeNamedAuthorTag = (name: string, width: string = defaultSize, height: string = defaultSize, fontSize: string = defaultFontSize) => ({
  label: name,
  icon: makeAuthorAvatar(name, width, height, fontSize),
  href: '',
});

const AUTHOR_TAG_MAP: {[key: string]: () => NamedTagInMap} = {
  FrankRosenblatt: () => makeNamedAuthorTag("Frank Rosenblatt"),
  KunihikoFukushima: () => makeNamedAuthorTag("Kunihiko Fukushima"),
  MarvinMinsky: () => makeNamedAuthorTag("Marvin Minsky"),
  WarrenMcCulloch: () => makeNamedAuthorTag("Warren McCulloch"),
  WalterPitts: () => makeNamedAuthorTag("Walter Pitts"),
  IoannisAntonoglou: () => makeNamedAuthorTag("Ioannis Antonoglou"),
  AlexGraves: () => makeNamedAuthorTag("Alex Graves"),
  KorayKavukcuoglu: () => makeNamedAuthorTag("Koray Kavukcuoglu"),
  YoshuaBengio: () => makeNamedAuthorTag("Yoshua Bengio"),
  GeoffreyHinton: () => makeNamedAuthorTag("Geoffrey Hinton"),
  YannLeCun: () => makeNamedAuthorTag("Yann LeCun"),
  VladMinh: () => makeNamedAuthorTag("Vlad Minh"),
  MartinRiedmiller: () => makeNamedAuthorTag("Martin Riedmiller"),
  RichardSutton: () => makeNamedAuthorTag("Richard Sutton"),
  DavidSilver: () => makeNamedAuthorTag("David Silver"),
  DemisHassabis: () => makeNamedAuthorTag("Demis Hassabis"),
  DaanWierstra: () => makeNamedAuthorTag("Daan Wierstra"),
};

const makeNamedAuthorTagAndPutInMap = (author: string) => {
  const authorTagName = author.replace(' ', '');
  AUTHOR_TAG_MAP[authorTagName] = () => makeNamedAuthorTag(author);
  return AUTHOR_TAG_MAP[authorTagName]();
};

export interface AuthorTagProps {
    author?: string;
    fontSize?: string;
};

const AuthorTag = ({
    author,
    fontSize = '14px',
}: AuthorTagProps) => {
  author = getFormattedName(author || '');
  const authorTagName = author.replace(' ', '');

  const authorTag = tagInMap(authorTagName, AUTHOR_TAG_MAP)
    ? AUTHOR_TAG_MAP[authorTagName]()
    : makeNamedAuthorTagAndPutInMap(author);

  return <Tag icon={authorTag.icon} label={author} variant="author" fontSize={fontSize} />;
};

export default AuthorTag;