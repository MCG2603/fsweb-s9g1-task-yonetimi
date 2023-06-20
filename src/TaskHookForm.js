import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function TaskHookForm(props) {
  let {kisiler,submitFn}=props
  const {
   
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people:[]

    },
  });
  
  
  function handleSubmit1(formState) {
  
    submitFn({
      ...formState,
      id: nanoid(5),
      status: "yapılacak",
    });
    
  }
  
  return (
    <form className="taskForm"  onSubmit={handleSubmit(handleSubmit1)}>

      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {required: "Task başlığı yazmalısınız", minLength: {value:3, message:"Task başlığı en az 3 karakter olmalı"}})}
          />
        <p className="input-error">{ errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {required: "Task açıklaması yazmalısınız", minLength: {value:10, message:"Task açıklaması en az 10 karakter olmalı"}})}
         
        ></textarea>
        <p className="input-error">{errors.description?.message  }</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  validate: (val)=> {
                  return val.length >= 1 ? (val.length > 3 ? "En fazla 3 kişi seçebilirsiniz" : null) : "Lütfen en az bir kişi seçin"
                }})}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
    
      </div>
    </form>
  );
};

