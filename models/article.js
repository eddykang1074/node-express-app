
module.exports = function(sequelize,DataTypes){
    return sequelize.define('article',{
        aid: {
            type: DataTypes.INTEGER,
            autoIncrement: true, //자동채번 설정
            primaryKey: true, //Primary키 설정
            allowNull: false, 
            comment: '게시글고유번호',
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
          comment: '글제목',
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '글내용',
        },
        view_cnt: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '조회수',
        },
        ip_address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '작성자IP주소',
        },
        display_yn: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '게시여부 0:게시안함 1:게시함',
        },
        regist_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
        },
        regist_user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '등록자명',
        },
        moidify_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
        },
        modify_user_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '수정자명',
        }
    },
    {
        sequelize,
        tableName: 'article', //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
        timestamps: false, 
        comment: '게시글정보테이블',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'aid' }],//여러개의 컬럼이 프라이머리키인경우(복합키){}추가하여 설정가능
          },
        ],
    }
 );
}