import React, { useState } from 'react';
import Modal from '../../components/Modal.jsx';
import TagInput from '../../components/TagInput.jsx';
import slugify from '../../utils/slugify.js';

export default function JobForm({ open, initial, onClose, onSave }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [tags, setTags] = useState(initial?.tags || []);
  const [status, setStatus] = useState(initial?.status || 'active');
  const [error, setError] = useState('');

  const submit = async () => {
    setError('');
    if (!title.trim()) { setError('Title required'); return; }
    const payload = { title: title.trim(), slug: slugify(slug || title), tags, status };
    try {
      await onSave(payload);
      onClose();
    } catch (e) {
      setError(e.message || 'Failed');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Edit job' : 'New job'}
      footer={<>
        <button className="btn secondary" onClick={onClose}>Cancel</button>
        <button className="btn" onClick={submit}>{initial ? 'Save' : 'Create'}</button>
      </>}>
      <div className="columns">
        <div>
          <label>Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div>
          <label>Slug</label>
          <input className="input" value={slug} onChange={e=>setSlug(e.target.value)} placeholder="auto from title" />
        </div>
      </div>
      <div style={{marginTop:10}}>
        <label>Tags</label>
        <TagInput value={tags} onChange={setTags}/>
      </div>
      <div style={{marginTop:10}}>
        <label>Status</label>
        <select className="input" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      {error && <p style={{color:'#b91c1c', marginTop:8}}>{error}</p>}
    </Modal>
  );
}
