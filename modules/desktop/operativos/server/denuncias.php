<?php

/*
 * AMC Desktop 1.0
 * Copyright(c) 2007-2017, Murdock Technologies, Inc.
 * licensing@qwikioffice.com
 *
 * http://www.qwikioffice.com/license
 */

class QoDenuncias
{

    private $os;

    /**
     * __construct()
     *
     * @access public
     * @param {class} $os The os.
     */
    public function __construct(os $os)
    {
        if (!$os->session_exists()) {
            die('Session does not exist!');
        }

        $this->os = $os;
    } // end __construct()

    // begin public module methods

    /**
     * personalZonales()
     */

    public function loadProfile()
    {
        $response = '{"success":false}';
    }

    public function personalZonales()
    {
        $response = '{"success":false}';
        $member_id = $this->os->get_member_id();
        if (isset($member_id) && $member_id != '' && is_numeric($member_id)) {
            $sql = 'SELECT
            first_name AS field1,
            last_name AS field2,
            email_address AS field3
            FROM
            qo_members
            WHERE
            id = ' . $member_id;

            $result = $this->os->db->conn->query($sql);
            if ($result) {

                $row = $result->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $response = '{"success":true,"data":' . json_encode($row) . '}';
                }
            }
        }
        print $response;
    } // end personalZonales()
}

?>