import { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { indentUnit, HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { tags as t } from '@lezer/highlight';

// Colores desde las variables CSS del tema de la clase.
const highlight = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.definitionKeyword, t.operatorKeyword], color: 'var(--accent)', fontWeight: '600' },
  { tag: t.function(t.definition(t.variableName)), color: 'var(--accent-strong)', fontWeight: '600' },
  { tag: [t.standard(t.variableName), t.number, t.bool, t.null], color: 'var(--amber)' },
  { tag: [t.string, t.special(t.string)], color: 'var(--code-string)' },
  { tag: t.comment, color: 'var(--text-faint)', fontStyle: 'italic' },
  { tag: [t.punctuation, t.bracket], color: 'var(--text-dim)' },
]);

const theme = EditorView.theme({
  '&': { backgroundColor: 'var(--bg-soft)', color: 'var(--text)' },
  '.cm-content': { caretColor: 'var(--accent)' },
  '.cm-cursor': { borderLeftColor: 'var(--accent)', borderLeftWidth: '1.5px' },
  '.cm-gutters': { backgroundColor: 'var(--bg-muted)', color: 'var(--text-faint)', borderRight: '1px solid var(--border)' },
  '.cm-activeLine': { backgroundColor: 'var(--accent-faint)' },
  '.cm-activeLineGutter': { backgroundColor: 'var(--accent-faint)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: 'var(--accent-selection)' },
  '&.cm-focused .cm-matchingBracket': { color: 'var(--amber)', backgroundColor: 'transparent', textDecoration: 'underline' },
}, { dark: true });

/**
 * Editor de Python no controlado: el documento vive en CodeMirror y el
 * padre se entera de los cambios por `onChange`.
 */
export default function CodeEditor({ initialValue, onChange, label }) {
  const hostRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const view = new EditorView({
      parent: hostRef.current,
      state: EditorState.create({
        doc: initialValue,
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          indentUnit.of('    '),
          EditorState.tabSize.of(4),
          python(),
          theme,
          syntaxHighlighting(highlight),
          EditorView.lineWrapping,
          EditorView.contentAttributes.of({ 'aria-label': label }),
          EditorView.updateListener.of(update => {
            if (update.docChanged) onChangeRef.current(update.state.doc.toString());
          }),
        ],
      }),
    });
    return () => view.destroy();
    // El editor se crea una sola vez: initialValue y label solo importan al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="code-editor" ref={hostRef} />;
}
