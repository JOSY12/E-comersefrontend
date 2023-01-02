/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addReview } from "../../redux/actions";

const AddComment = ({
    modalId,
    productId,
    userId
}) =>
{
    const dispatch = useDispatch();
    const [rating, setRating] = useState("1");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        dispatch(addReview(productId, { rating, description, userId }));
    };

    return (
        <div class="modal" id={modalId}>
            <div class="modal-box">
                <form onSubmit={e => handleSubmit(e)}>
                    <a href="#" className="btn bg-white border-none hover:bg-white text-stone-500 btn-sm btn-circle absolute right-2 top-2">✕</a>
                    <h3 class="font-bold text-lg">Déjanos tu reseña</h3>
                    <div className="mt-4">
                        <p>Rating:</p>
                        <div className="rating mt-2">
                            {["1", "2", "3", "4", "5"].map(i =>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={i}
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={rating === i}
                                    onChange={e => setRating(e.target.value)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p>Comentario:</p>
                        <textarea
                            className="mt-2 textarea w-96 border-stone-500"
                            placeholder="Escribe tu comentario aquí"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div class="modal-action">
                        <button type="submit" class="btn bg-stone-400 hover:bg-stone-500 border-none">Agregar comentario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComment;