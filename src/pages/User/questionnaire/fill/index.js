import React from 'react';
const data = [
    {
    key: '0',
    Id: '134r3gtrfv9004',
    title: '认知筛查量表',
    date: '2017/12/30',
    TotalScore: 13,
    PassScore: 12,
    Topics: [
        {
            Id:'ysgd8347470de9f',
            QuestionnaireId: 'rt839frgyu9g',
            Title: '请重复刚才的五个词语：每个词1分。',
            Image: '',
            Order: 8,
            GroupName: '记忆力',
            TotalScore: 5,
            Type: 1,
        },
        {
            Id:'tfrdyht8347470de9f',
            QuestionnaireId: 'rt83re56r7t76ju',
            Title: '请重复刚才的五个词语：每个词1分。',
            Image: '',
            Order: 5,
            GroupName: '主观认知下降，你觉得以下方面哪方面有问题？（受访者需要即刻回答）',
            TotalScore: 1,
            Type: 0,
        },
    ],
    stage: '发布中',
}
];

export default class Fill extends React.Component {
    constructor(props) {
        super(props);
    }

    getQuestions() {
        if (data) {
            return data.Topics.map((item,index) =>{
                console.log('@item',item)
                return (
                    <div key={index}>
                        <span>{item.GroupName}</span>
                        <span>{item.Order}. {item.Title}</span>
                    </div>
                )
            })
        }
    }

    render() {
        return(
            <div>
                {this.getQuestions()}
            </div>
        )
    }
}