import React from "react";

import { Table as TableComposer } from "../table-composition";
import { ButtonProps } from "../button";
// import useTableSortFilter from '@/presentation/hooks/use-table-sort-filter';

type HeaderType = {
  label: string;
  key: string;
};

type PaginationInfoType = {
  count: number;
  next?: string;
  previous?: string;
};

type PageChangeType = {
  selected: number;
};

type TableProps = {
  rows: any[];
  headers: HeaderType[];
  title?: string | null;
  renderCellContent: (row: any, key: string) => any;
  className?: string;
  actionButton?: React.ReactElement<ButtonProps>;
  isStriped?: boolean;
  withBorder?: boolean;
  rowClassName?: string;
  headerClassName?: string;
  paginationInfo?: PaginationInfoType;
  handlePageChange?: (selected: PageChangeType) => void;
  containerClassName?: string;
  handleSearch?: (value: string) => void;
  handleRefetch?: () => void;
};

export type CustomTableParams = {
  title?: string;
  pageSize?: number;
  search?: string;
};

export const sortById = (value: any[]) => {
  return value.sort((a, b) => b - a);
};

export const Table = ({
  rows,
  headers,
  title = null,
  renderCellContent,
  className = "",
  actionButton,
  isStriped = false,
  withBorder = false,
  rowClassName = "",
  headerClassName = "",
  paginationInfo,
  handlePageChange,
  containerClassName = "",
  handleSearch,
  handleRefetch,
}: TableProps) => {
  // const { data, filter, sort } = useTableSortFilter(rows);

  return (
    <TableComposer.Root
      withBorder={withBorder}
      containerClassName={containerClassName}
    >
      {title && (
        <TableComposer.Scope title={title} actionButton={actionButton} />
      )}
      {handleSearch && (
        <TableComposer.Scope>
          <div></div>
          <TableComposer.Search handleSearch={(value) => handleSearch(value)} />
        </TableComposer.Scope>
      )}
      <TableComposer.Overlay>
        {rows.length > 0 ? (
          <TableComposer.Content isStriped={isStriped} className={className}>
            <TableComposer.Header>
              <TableComposer.Row className={headerClassName}>
                {headers.map((header, index) => (
                  <TableComposer.Column
                    key={index}
                    // sort={() => sort(header.key as keyof typeof rows)}
                    sort={() => {}}
                    isSorted={false}
                  >
                    {header.label}
                  </TableComposer.Column>
                ))}
              </TableComposer.Row>
            </TableComposer.Header>
            <TableComposer.Body>
              {rows.map((row, index) => (
                <TableComposer.Row key={index} className={rowClassName}>
                  {headers.map(({ key }) => (
                    <TableComposer.Cell key={key}>
                      {renderCellContent(row, key)}
                    </TableComposer.Cell>
                  ))}
                </TableComposer.Row>
              ))}
            </TableComposer.Body>
          </TableComposer.Content>
        ) : (
          <TableComposer.Empty
            headline="Nenhum dado encontrado."
            paragraph=""
            onReload={handleRefetch}
          />
        )}
      </TableComposer.Overlay>
    </TableComposer.Root>
  );
};
