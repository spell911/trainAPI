import { mysqlDB } from "../shared/mysql-db";

class User {
  list(cb: Function) {
    let sql = "select * from sc_user";
    mysqlDB.query(sql, cb);
  }
}

export const UserService: User = new User();
