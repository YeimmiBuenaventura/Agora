import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiAgora from '../../../api/index'
import style from "./style.module.css"
import { showErrMsg, showSuccessMsg } from '../../../utils/notification'
function ActivationEmail () {
  const { activation_token } = useParams()
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  console.log(err,success)
  
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await apiAgora.post('/api/activation', {
            activation_token
          })
          setSuccess(res.data.msg)
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg)
        }
      }
      activationEmail()
    }
  }, [activation_token])

  return (
    <div className={style.active_page}>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  )
}

export default ActivationEmail
