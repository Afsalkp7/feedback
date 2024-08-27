import { useState } from 'react';
import { Button, Input, Select, message } from 'antd';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const fieldTypes = [
  { type: 'SingleLineInput', label: 'Single Line Input' },
  { type: 'TextArea', label: 'Text Area' },
  { type: 'NumericalRating', label: 'Numeric Rating' },
  { type: 'StarRating', label: 'Star Rating' },
  { type: 'SmileRating', label: 'Smiley Rating' },
  { type: 'RadioButtons', label: 'Radio Button' },
  { type: 'Categories', label: 'Categories' },
];

const FieldButton = ({ field }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'FIELD',
        item: field,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <Button
            ref={drag}
            className="opacity-100 mb-2 cursor-move w-full"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            disabled={isDragging}
        >
            {field.label}
        </Button>
    );
};

const DropArea = ({ onDrop, children }) => {
    const [, drop] = useDrop({
        accept: 'FIELD',
        drop: (item) => onDrop(item),
    });

    return (
        <div
            ref={drop}
            className="border border-gray-300 p-5 min-h-[200px] mb-5"
        >
            {children}
        </div>
    );
};

const FormBuilder = () => {
    const navigate = useNavigate();
    const { feedbackBoxName } = useParams();
    const [fields, setFields] = useState([]);
    const [title, setTitle] = useState(feedbackBoxName);

    const handleDrop = (field) => {
        if (fields.length < 7) {
            setFields([...fields, { ...field, id: Date.now(), label: '', isRequired: false, errorMessage: '', options: [] }]);
        } else {
            message.error('You can add a maximum of 7 fields.');
        }
    };

    const handleChange = (id, key, value) => {
        setFields(fields.map(field => field.id === id ? { ...field, [key]: value } : field));
    };

    const handleDelete = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const handleSubmit = async () => {
        if (fields.length < 1 || fields.length > 7) {
            message.error('You must add between 1 and 7 fields.');
            return;
        }

        const payload = {
            title,
            fields: fields.map(field => ({
                fieldType: field.type,
                label: field.label,
                isRequired: field.isRequired,
                errorMessage: field.errorMessage,
                options: field.options,
            })),
        };

        try {
            const response = await axios.post('http://localhost:5000/api/feed/add', payload);
            message.success('Feedback form created successfully!');
            navigate(`/admin`);
            
        } catch (error) {
            console.error('Error creating feedback form:', error);
            message.error('Failed to create feedback form.');
        }
    };

    return (
        <div className="pt-24 px-24">
            <Input
                placeholder="Enter form title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-6"
            />
            <DndProvider backend={HTML5Backend}>
                <div className="flex gap-6">
                    <div className="w-2/3">
                        <DropArea onDrop={handleDrop}>
                            {fields.map((field) => (
                                <div key={field.id} className="mb-4 p-4 border border-gray-300">
                                    <Input
                                        placeholder="Field Label"
                                        value={field.label}
                                        onChange={(e) => handleChange(field.id, 'label', e.target.value)}
                                        className="mb-4"
                                    />
                                    <Select
                                        value={field.isRequired}
                                        onChange={(value) => handleChange(field.id, 'isRequired', value)}
                                        className="w-full mb-4"
                                    >
                                        <Select.Option value={true}>Required</Select.Option>
                                        <Select.Option value={false}>Optional</Select.Option>
                                    </Select>
                                    {field.isRequired && (
                                        <Input
                                            placeholder="Error Message"
                                            value={field.errorMessage}
                                            onChange={(e) => handleChange(field.id, 'errorMessage', e.target.value)}
                                            className="mb-4"
                                        />
                                    )}
                                    {(field.type === 'RadioButtons' || field.type === 'Categories') && (
                                        <Input
                                            placeholder="Options (comma separated)"
                                            value={field.options.join(',')}
                                            onChange={(e) => handleChange(field.id, 'options', e.target.value.split(','))}
                                            className="mb-4"
                                        />
                                    )}
                                    <Button type="danger" onClick={() => handleDelete(field.id)} className="w-full">
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </DropArea>
                    </div>
                    <div className="w-1/3">
                        {fieldTypes.map((field, index) => (
                            <div key={index} className="mb-4">
                                <FieldButton key={field.type} field={field} />
                            </div>
                        ))}
                    </div>
                </div>
            </DndProvider>
            <Button
                type="primary"
                onClick={handleSubmit}
                disabled={fields.length < 1 || fields.length > 7}
                className="w-full mt-6"
            >
                Create
            </Button>
        </div>
    );
};

export default FormBuilder;
