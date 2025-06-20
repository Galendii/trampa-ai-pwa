import { Date } from './addons/date';
import { Search } from './addons/search';
import { Body } from './layout/body';
import { Cell } from './layout/cell';
import { Column } from './layout/column';
import { Content } from './layout/content';
import { Empty } from './layout/empty';
import { Header } from './layout/header';
import { Overlay } from './layout/overlay';
import { Root } from './layout/root';
import { Row } from './layout/row';
import { Scope } from './layout/scope';
import { Pagination } from './pagination';

export const Table = Object.assign(
  {},
  {
    Root: Root,
    Header: Header,
    Body: Body,
    Row: Row,
    Column: Column,
    Content: Content,
    Scope: Scope,
    Cell: Cell,
    Overlay: Overlay,
    Pagination: Pagination,
    Search: Search,
    Date: Date,
    Empty: Empty,
  }
);
