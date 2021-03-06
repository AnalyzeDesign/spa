$(function() {

  function taskHtml(task) {
     const checkedStatus = task.done ? "checked" : "";
     const liElement = `<li class="${checkedStatus}" id="listItem-${task.id}">
                <div class="view">
                  <input class="toggle" type="checkbox" ${checkedStatus} data-id="${task.id}">
                  <label>${task.title}</label>
                </div>
              </li>`;
     return liElement;
  }

  function toggleTask(e) {
      $.post(`/tasks/${$(e.target).data("id")}`, {
        _method: "PUT",
        task: {
          done: Boolean($(e.target).is(":checked"))
        }
      }).success(function(data){
        $('#listItem-'+data.id).replaceWith(taskHtml(data));
        $('.toggle').change(toggleTask);
      });
  }

  $.get("/tasks").success(function(data){
     let htmlString = "";
     $.each(data, function(index, task){
        htmlString += taskHtml(task);
     });
     $('.todo-list').html(htmlString);
     $('.toggle').change(toggleTask);
  });

  $('#new-form').submit(function(e){
    e.preventDefault();
    const payload = {
      task: {
        title: $(this).find('.new-todo').val()
      }
    };
    $.post("/tasks", payload).success(function(data){
      $('.todo-list').append(taskHtml(data));
      $('.toggle').click(toggleTask);
      $('.new-todo').val('');
    });
  });
});
