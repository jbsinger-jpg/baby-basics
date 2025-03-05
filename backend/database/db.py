from dataclasses import dataclass
from typing import Literal, NamedTuple

import pyodbc


@dataclass
class WhereClause:
    lhs: str
    operator: str
    rhs: str

    def to_sql_statement(self):
        return "WHERE " + " ".join(self.__dict__.values())

    def with_comp(self):
        return " ".join(self.__dict__.values())


class CompoundWhere(NamedTuple):
    # Make a third class to handle multiple boolean operations?
    # Not sure if the statements need to get that complicated for searching.
    boolean_operator: Literal["AND", "OR", "NOT"]
    where_clause: list[WhereClause]

    def to_sql_statement(self):
        if not len(self.where_clause):
            return ""

        if self.boolean_operator == "NOT":
            return "WHERE NOT " + " AND NOT ".join(
                clause.with_comp() for clause in self.where_clause
            )

        clauses = [
            clause.with_comp() for clause in self.where_clause
        ]
        return "WHERE " + f" {self.boolean_operator} ".join(clauses)


class ODBCBase:
    def __init__(self, connection_str: str) -> None:
        self._conn = pyodbc.connect(connection_str)
        self.cursor = self._conn.cursor()

    def execute(self):
        pass

    def execute_many(self):
        pass


class BabyBasicsDB(ODBCBase):
    # Queries are made to be SELECT statements since a user is never going
    # to have access to updating or deleting data.
    def get_bath_store_items(self, columns: str, compound_where: CompoundWhere = None):
        return self._get_store_items("bath", columns, compound_where)

    def _get_store_items(self,
                         table: Literal["bath",
                                        "car_seats",
                                        "clothing",
                                        "diapers",
                                        "food",
                                        "formula",
                                        "maternal_clothes",
                                        "monitors",
                                        "sleep",
                                        "stollers",
                                        "toys",
                                        "vitamins"],
                         columns: list | str,
                         compound_where: CompoundWhere = None
                         ) -> list[dict]:

        if isinstance(columns, list):
            columns = ",".join(columns)

        if not compound_where:
            query = f"SELECT {columns} FROM {table}"
            return self.execute(query)

        query = f"SELECT {columns} FROM {table} {compound_where.to_sql_statement()};"
        return self.execute(query)

    def _get_messages():
        pass

    def _get_ratings():
        pass
