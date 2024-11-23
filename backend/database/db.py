from typing import Literal

import pyodbc


class ODBCBase:
    def __init__(self, connection_str: str) -> None:
        self._conn = pyodbc.connect(connection_str)
        self.cursor = self._conn.cursor()

    def execute(self):
        pass

    def execute_many(self):
        pass


class BabyBasicsDB(ODBCBase):
    def get_bath_store_items(self, columns: str, where_clause: dict = None):
        return self._get_store_items("bath", columns, where_clause)

    # Wrapper methods
    def _get_store_items(self, table: Literal["bath", "car_seats",
                                              "clothing", "diapers",
                                              "food", "formula",
                                              "maternal_clothes", "monitors",
                                              "sleep", "stollers", "toys",
                                              "vitamins"],
                         columns: list | str,
                         where_clause: dict[str, str] = None
                         ) -> list[dict]:

        if isinstance(columns, list):
            columns = ",".join(columns)

        where_op = ""

        if where_clause:
            where_op = "WHERE"
            f" {where_clause["lhs"]}"
            f" {where_clause["operator"]}"
            f" {where_clause['rhs']}"

        query = f"SELECT {columns} FROM {table} {where_op};"
        results = self.execute(query)

        return results

    def _get_messages():
        pass

    def _get_ratings():
        pass
