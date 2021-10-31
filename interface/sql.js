function sqls() {
    this.LOGIN_SQL = "select * from user where name=? and pas=?"
    this.REG_SQL = "insert into user (name, pas, truename, phone, department, mailbox) values (?,?,?,?,?,?)"
    this.HEADER_SQL = "select * from user where uid=?"
    this.SEARCH_SQL = "select * from paper where aid=? and title like ?"
    this.BUY_SQL = "select * from paper where status=1"
    this.CPOINT_SQL = "update user set points=? where uid=?"
    this.PAPER_SQL = "select * from paper"
    this.ZHUANJIA_SQL = "select * from paper where docid=?"
    this.STAND_SQL = "select * from standard"
    this.SPOINT_SQL = 'update paper set p1=?, p2=?, p3=?, p4=?, p5=?, comment=?, point=?, reviewer=?, status=1 where docid=?'
    this.USER_SQL = "select * from user"
    this.ROLE_Sql = 'update user set points=?,role=? where uid=?'
}

module.exports = sqls