import {
    inputTask,
    listTaskLabel,
    divResult,
    spanError,
    btnRemoveAllTask,
    blockDel,
} from './public/js/constans.js';

inputTask.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (inputTask.value === '') {
            inputTask.style.border = '2px solid red';

            let spanTextErr = `<span>Ошибка: пустое поле</span>`;

            spanError.innerHTML = spanTextErr;
            spanError.style.display = 'block';
            spanError.style.color = 'red';
        } else {
            inputTask.style.border = '2px solid black';
            spanError.style.display = 'none';

            let div = document.createElement('div');

            listTaskLabel.after(div);
            divResult.insertAdjacentElement('afterbegin', div);
            div.classList.add('block-tasck_div');
            let html = `<input type="checkbox" name="list_tasck" id="list_tasck" />
<p class='list-task_p__line'>${inputTask.value}</p>
<button class="btn_remove">Удалить</button>
  `;

            div.insertAdjacentHTML('afterbegin', html);

            let divTask = document.querySelector('.block-tasck_div');
            let childrens = [...divTask.children];

            childrens.forEach(function (item) {
                if (item.tagName === 'INPUT') {
                    item.onclick = function () {
                        let flag = false;
                        let pItem = item.nextElementSibling;

                        if (
                            pItem.classList.contains('list-task_p__decoration')
                        ) {
                            pItem.classList.remove('list-task_p__decoration');
                            flag;
                        } else {
                            pItem.classList.add('list-task_p__decoration');
                            flag = !flag;

                            if (flag === true) {
                                let pDecor = document.querySelector(
                                    '.list-task_p__decoration'
                                ).innerHTML;
                                let htmlDecor = `<p class='text_p__decoration'>${pDecor}</p>`;

                                blockDel.insertAdjacentHTML(
                                    'beforeend',
                                    htmlDecor
                                );
                            }
                        }
                    };
                }
                if (item.tagName === 'BUTTON') {
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        document.querySelector('.block-tasck_div').remove();
                    });
                }
            });

            btnRemoveAllTask.addEventListener('click', (e) => {
                e.preventDefault();

                blockDel.remove();
            });
        }
    }
});
