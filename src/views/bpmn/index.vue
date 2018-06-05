<template>
  <el-container>
    <el-header>
      <ul class="buttons">
        <li>
          download
        </li>
        <li>
          <a id="js-download-diagram" href title="download BPMN diagram">
            BPMN diagram
          </a>
        </li>
        <li>
          <a id="js-download-svg" href title="download as SVG image">
            SVG image
          </a>
        </li>
      </ul>
    </el-header>
    <el-main>
      <div class="content" id="js-drop-zone">

        <div class="message intro">
          <div class="note">
            Drop BPMN diagram from your desktop or <a id="js-create-diagram" @click.stop.prevent="createNewDiagram" href>create a new diagram</a> to get started.
          </div>
        </div>

        <div class="message error">
          <div class="note">
            <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

            <div class="details">
              <span>cause of the problem</span>
              <pre></pre>
            </div>
          </div>
        </div>

        <div class="canvas" id="js-canvas"></div>
        <div id="js-properties-panel"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import $ from 'jquery'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from './provider/magic'
import magicModdleDescriptor from './descriptors/magic'
import diagramXML from './newDiagram.bpmn'
export default {
  name: 'index',
  data () {
    return {
      container: '',
      bpmnModeler: ''
    }
  },
  created () {
    this.container = $('#js-drop-zone')

    this.bpmnModeler = new BpmnModeler({
      container: '#js-canvas',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule
      ],
      moddleExtensions: {
        magic: magicModdleDescriptor
      }
    })
    if (!window.FileList || !window.FileReader) {
      window.alert(
        'Looks like you use an older browser that does not support drag and drop. ' +
        'Try using Chrome, Firefox or the Internet Explorer > 10.')
    } else {
      this.registerFileDrop(this.container, this.openDiagram)
    }
  },
  methods: {
    createNewDiagram () {
      this.openDiagram(diagramXML)
    },
    openDiagram (xml) {
      console.log(this.bpmnModeler)
      this.bpmnModeler.importXML(xml, function (err) {
        if (err) {
          this.container
            .removeClass('with-diagram')
            .addClass('with-error')

          this.container.find('.error pre').text(err.message)

          console.error(err)
        } else {
          this.container
            .removeClass('with-error')
            .addClass('with-diagram')
        }
      })
    },
    saveSVG (done) {
      this.bpmnModeler.saveSVG(done)
    },
    saveDiagram (done) {
      this.bpmnModeler.saveXML({format: true}, function (err, xml) {
        done(err, xml)
      })
    },
    registerFileDrop (container, callback) {
      let handleFileSelect = (e) => {
        e.stopPropagation()
        e.preventDefault()
        var files = e.dataTransfer.files
        var file = files[0]
        var reader = new FileReader()
        reader.onload = (e) => {
          var xml = e.target.result
          callback(xml)
        }
        reader.readAsText(file)
      }
      let handleDragOver = (e) => {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy' // Explicitly show this is a copy.
      }

      container.get(0).addEventListener('dragover', handleDragOver, false)
      container.get(0).addEventListener('drop', handleFileSelect, false)
    }
  }
}
</script>

<style scoped>

</style>
