import React, { useState } from 'react';
import { FaTrash, FaPen, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { UPDATE_PROJECT, DELETE_PROJECT } from '../mutations/projectMutations';
import ProjectModal from './ProjectModal';

export default function ProjectRow({ project, updateProjectInList }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openUpdateModal = () => {
        setIsModalOpen(true);
    };

    const handleUpdateProject = (updatedProject) => {
        //updateProjectInList(updatedProject);
        setIsModalOpen(false);
    };

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: project.id },

        //Way 1: get client again (after delete a client) - working
        refetchQueries: [{ query: GET_PROJECTS }],

        //Way 2: update cache (after delete a client) - working
        // update(cache, { data: { deleteProject } }) {
        //     const { clients } = cache.readQuery({ query: GET_PROJECTS });
        //     cache.writeQuery({
        //         query: GET_PROJECTS,
        //         data: {
        //             clients: clients.filter((client) => client.id !== deleteProject.id),
        //         },
        //     });
        // },
    });

    return (
        <>
            <tr>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>{project.clientId}</td>
                <td className='text-center'>
                    <button className='btn btn-primary btn-sm' onClick={openUpdateModal}>
                        <FaPen />
                    </button> 
                    &nbsp;
                    <button className='btn btn-danger btn-sm' onClick={deleteProject}>
                        <FaTrash />
                    </button>
                </td>
            </tr>
            {isModalOpen && (
                <ProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={project}
                    onUpdate={handleUpdateProject}
                />
            )}
        </>
    );
}

