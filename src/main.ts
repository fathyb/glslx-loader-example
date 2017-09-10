import {Program, ShaderCompilationError} from 'glslx-loader/runtime'
import identity from 'gl-mat4/create'
import scale from 'gl-mat4/scale'
import translate from 'gl-mat4/translate'

import {Vertex, Fragment, ColorFragment} from './main.gl'

// Create a canvas and get a GL context
const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl')!

canvas.width = 250
canvas.height = 250

document.body.appendChild(canvas)

// Set the viewport and clear with green
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
gl.clearColor(0, 1, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

// Create and fill a buffer with our vertices
const buffer = gl.createBuffer()!

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, //   left, bottom
     1, -1, //  right, bottom
     0,  1  // center, top
]), gl.STATIC_DRAW)

// Here comes the shaders
// Compile and link Vertex and Fragment from ./test.gl
const program = new Program(gl, Vertex, Fragment)

// Use the program, shortcut for gl.useProgram(program.program)
program.use()

// Equivalent of glEnableVertexAttribArray
program.enablePosition()

// Equivalent of glVertexAttribPointer
program.setPositionPointer(2, gl.FLOAT, false, 0, 0)

// Equivalent of glUniform*, sets the color to blue
program.setColor(0, 0, 1)

// create a 4x4 transformation matrix
const transform = identity()

// scale by .5 and translate xy by 1
scale(transform, transform, [.5, .5, .5])
translate(transform, transform, [-1, -1, 0])

program.setTransform(transform)

// Draw the 3 vertices
gl.drawArrays(gl.TRIANGLES, 0, 3)

// Equivalent of glDisableVertexAttribArray
program.disablePosition()
