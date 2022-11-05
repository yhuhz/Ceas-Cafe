<?php
  // Tells the browser to allow code from any origin to access
  header("Access-Control-Allow-Origin: *");
  // Tells browsers whether to expose the response to the frontend JavaScript code when the request's credentials mode (Request.credentials) is include
  header("Access-Control-Allow-Credentials: true");
  // Specifies one or more methods allowed when accessing a resource in response to a preflight request
  header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
  // Used in response to a preflight request which includes the Access-Control-Request-Headers to indicate which HTTP headers can be used during the actual request
  header("Access-Control-Allow-Headers: Content-Type");

  require_once('../MysqliDb.php');
  class API
  {
      public function __construct()
      {
          $this->db = new MysqliDB('localhost', 'root', '', 'ceas');
      }

      public function httpGet($payload)
      {
        if (isset($_GET['query'])) {
          if ($_GET['query'] === 'category') {
            $this->db->groupBy ($_GET['query']);
          }

          $ceas = $this->db->get('category');
          echo json_encode(array(
            'status' => 'success',
            'data' => $ceas,
            'method' => 'GET'
          ));
        } else {
          $ceas = $this->db->get('menu');
          echo json_encode(array(
            'status' => 'success',
            'data' => $ceas,
            'method' => 'GET'
          ));
        }

      }
      public function httpPost($payload)
      {
          // Do not add task to timesheet if it is for evaluation or if it is currently on going on timesheet
          $this->db->where('work_task_id', $payload['work_task_id']);
          $this->db->orderBy('id', "Desc");
          $timesheets = $this->db->getOne('tbl_employee_task_timesheet');
          if (!is_null($timesheets)) {
              $this->db->where('id', $payload['work_task_id']);
              $task = $this->db->getOne('tbl_work_tasks');
              if ((!empty($timesheets['start_date']) && empty($timesheets['end_date'])) || $task['status'] == 2) {
                  echo json_encode(array('status' => 'fail',
                    'message' => "Task is currently on-going or for evaluation",
                    'method' => 'POST'
                  ));
                  return;
              } elseif (empty($timesheets['start_date']) && empty($timesheets['end_date'])) {
                  echo json_encode(array('status' => 'fail',
                  'message' => "Task is already open in timesheet",
                  'method' => 'POST'
                ));
                  return;
              }
          }

          $timesheet['id'] = $this->db->insert('tbl_employee_task_timesheet', $payload);
          $this->db->where('et.id', $timesheet['id']);
          $this->db->join('tbl_work_tasks wt', 'wt.id=et.work_task_id', 'LEFT');
          $task_timesheet = $this->db->get('tbl_employee_task_timesheet et', null, 'et.id, start_date, end_date, wt.task_name, wt.ticket_number, wt.status');


          if ($task_timesheet) {
              echo json_encode(array('status' => 'success',
                                'data' => $task_timesheet,
                                'method' => 'POST'
                              ));
          }
      }
      public function httpPut($payload)
      {
          $timesheets = $payload;

          $this->db->where('id', $timesheets['id']);
          $this->db->update('tbl_employee_task_timesheet', $timesheets);

          // Update task to (on going) if it is the first time to start the task
          $this->db->where('id', $timesheets['id']);
          $task = $this->db->getOne('tbl_employee_task_timesheet', null, 'work_task_id');
          $this->db->where('work_task_id', $task['work_task_id']);
          $timesheets_record = $this->db->get('tbl_employee_task_timesheet');
          if (count($timesheets_record) == 1) {
              $this->db->where('id', $task['work_task_id']);
              $this->db->update('tbl_work_tasks', ["status" => 1]);
          }

          $this->db->where('et.id', $timesheets['id']);
          $this->db->join('tbl_work_tasks wt', 'wt.id=et.work_task_id', 'LEFT');
          $task_timesheet = $this->db->get('tbl_employee_task_timesheet et', null, 'et.id, wt.id as work_task_id, start_date, end_date, wt.task_name, wt.ticket_number, wt.status');

          if ($task_timesheet) {
              echo json_encode(array('status' => 'success',
                                'data' => $task_timesheet,
                                'method' => 'PUT'
                              ));
          }
      }
      public function httpDelete($payload)
      {
          // $this->db->delete();
          echo json_encode(array('method' => 'DFLETE'));
      }
  }



  /* END OF CLASS */




  $received_data = json_decode(file_get_contents('php://input'), true);



  $request_method = $_SERVER['REQUEST_METHOD'];




  $api = new API;




  if ($request_method == 'GET') {
      $api->httpGet($received_data);
  }



  if ($request_method == 'POST') {
      $api->httpPost($received_data);
  }



  if ($request_method == 'PUT') {
      $api->httpPut($received_data);
  }



  if ($request_method == 'DELETE') {
      $api->httpDelete($received_data);
  }
